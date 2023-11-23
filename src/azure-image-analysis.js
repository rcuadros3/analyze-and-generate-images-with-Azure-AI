const analyzeImage = async (imageUrl, features) => {
  const subscriptionKey = '085d1e23db554897a99227faf2e6d31f';
  const endpoint = 'https://images-azure-ai.cognitiveservices.azure.com/';
  const apiUrl = `${endpoint}vision/v3.0/analyze?api-version=2023-02-01-preview&${features}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
      body: JSON.stringify({ url: imageUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result; // Devuelve el resultado para mostrar en la página
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

export default analyzeImage;
