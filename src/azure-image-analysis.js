const analyzeImage = async (imageUrl, features) => {
  const subscriptionKey = process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY;
  const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
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
