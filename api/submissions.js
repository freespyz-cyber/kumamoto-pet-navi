export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'Method not allowed' }); return; }
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.SUBMISSION_NOTIFY_EMAIL;
  if (!apiKey || !notifyEmail) { res.status(503).json({ ok: false, error: '投稿受付の準備中です。' }); return; }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    if (!body.category || !body.area || !body.place || body.dataConsent !== 'yes') { res.status(400).json({ ok: false, error: '必須項目と確認欄を入力してください。' }); return; }
    const text = ['熊本ペットナビに新しい投稿が届きました。', '', '種類：' + body.category, '地域：' + body.area, '施設名：' + body.place, '詳細：' + (body.details || '（なし）'), '公式URL：' + (body.url || '（なし）'), '連絡先：' + (body.contact || '（なし）')].join('\n');
    const attachments = body.photo && body.photo.data && body.photo.name ? [{ filename: String(body.photo.name).replace(/[^a-zA-Z0-9._-]/g, '-').slice(-120), content: body.photo.data }] : undefined;
    const response = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL || '熊本ペットナビ <onboarding@resend.dev>', to: [notifyEmail], subject: '新しい投稿：' + body.place, text, ...(attachments ? { attachments } : {}) }) });
    if (!response.ok) throw new Error('Resend returned ' + response.status);
    res.status(201).json({ ok: true, message: '情報を受け付けました。' });
  } catch (error) { console.error('[api/submissions] failed', error); res.status(500).json({ ok: false, error: '送信できませんでした。時間をおいて再度お試しください。' }); }
}
