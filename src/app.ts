import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

export async function app() {
  const res = await query('Today the weather is ');
  console.log(res);
}

async function query<T extends unknown>(data: T) {
  const url = 'https://api-interference.huggingface.co/models/gpt1';
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    method: 'POST',
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
}

app();
