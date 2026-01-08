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
          content: `Write a short, ${tone} reply to this tweet. Keep it under 280 characters and make it engaging and natural:\n\n"${prompt}"`
        }],
        max_tokens: 100,
        temperature: 0.8
      })
    });
    
    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content || "Error generating reply";
    
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
