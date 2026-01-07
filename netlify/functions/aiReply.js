exports.handler = async function(event) {
  try {
    const { prompt, tone } = JSON.parse(event.body);
    
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 150,
        messages: [{
          role: "user",
          content: `Write a short, ${tone} reply to this tweet. Keep it under 280 characters and make it engaging and natural:\n\n"${prompt}"`
        }]
      })
    });
    
    const data = await resp.json();
    const reply = data.content?.[0]?.text || "Error generating reply";
    
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
