export async function onRequestPost(context) {
try {
const body = await context.request.json();
const message = body.message;

```
if (typeof message !== "string" || !message.trim()) {
  return Response.json(
    { error: "Please enter a message." },
    { status: 400 }
  );
}

if (message.length > 2000) {
  return Response.json(
    { error: "Please keep your message under 2000 characters." },
    { status: 400 }
  );
}

const result = await context.env.AI.run(
  "@cf/meta/llama-3.1-8b-instruct",
  {
    messages: [
      {
        role: "system",
        content: "You are Echo AI, a friendly and helpful AI assistant. Answer clearly and conversationally."
      },
      {
        role: "user",
        content: message.trim()
      }
    ]
  }
);

return Response.json({ reply: result.response });
```

} catch (error) {
return Response.json(
{ error: "Echo AI couldn't respond right now. Please try again." },
{ status: 500 }
);
}
}
