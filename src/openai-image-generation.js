const generateImage = async (prompt, model = "dall-e-3", n = 1, size = "1024x1024") => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiUrl = process.env.REACT_APP_OPENAI_API_URL;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          prompt,
          n,
          size,
        }),
      });

      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${result.error.message}`);
      }
  
      console.log(result);
      return result; // Devuelve el resultado para mostrar en la página
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  };
  
  export default generateImage;
  