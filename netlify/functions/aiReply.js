exports.handler = async function(event) {
  try {
    const { prompt, tone } = JSON.parse(event.body);
    
    const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{
          role: "user",
          content: `Write a short, ${tone} reply to this tweet. Follow these rules strictly:
- Keep it under 280 characters
- Make it engaging and natural
- NO hashtags
- NO emojis
- NO quotation marks
- Write as plain text only

Tweet: "${prompt}"`
        }],
        max_tokens: 100,
        temperature: 0.8
      })
    });
    
    const data = await resp.json();
    let reply = data.choices?.[0]?.message?.content || "Error generating reply";
    
    // Remove any hashtags, emojis, and quotation marks that might slip through
    reply = reply
      .replace(/#\w+/g, '')  // Remove hashtags
      .replace(/["'"]/g, '')  // Remove quotation marks
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')  // Remove emojis
      .trim();
    
    return { 
      statusCode: 200, 
      body: JSON.stringify({ reply }) 
    };
  } catch (err) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ reply: "Error: " + err.message }) 
    };
  }
};
