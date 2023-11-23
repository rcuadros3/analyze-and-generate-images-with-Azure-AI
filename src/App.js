import React, { useState } from 'react';
import analyzeImage from './azure-image-analysis';
import generateImage from './openai-image-generation';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImageAnalysisClick = async () => {
    try {
      setLoading(true);
      const features = 'tags,read,caption,denseCaptions,smartCrops,objects,people';

      const result = await analyzeImage(imageUrl, features);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setLoading(false);
      // Limpiar la URL despues de analizarla
      setOriginalImageUrl(imageUrl);
      setImageUrl('');
    }
  };

  const handleImageGenerationClick = async () => {
    try {
      setLoading(true);
      // Llamada a la función para generar la imagen
      const generatedImageUrl = await generateImage("tu-prompt-para-generar-imagen");
      // Mostrar la URL de la imagen generada en la consola
      console.log('Generación de imágenes desencadenada:', generatedImageUrl);
      // Puedes hacer más con la URL generada, por ejemplo, mostrarla en la interfaz.
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const DisplayResults = () => {
    if (loading) {
      return <p>Processing...</p>;
    }
  
    if (analysisResult) {
      const categories = analysisResult.categories;
      const metadata = analysisResult.metadata;
  
      return (
        <div>
          <h2>Computer Vision Analysis</h2>
          {originalImageUrl && <img src={originalImageUrl} alt="Analyzing" width="200" />}
          <p>{"{"}</p>
          {originalImageUrl && <p>{`  "URL": "${originalImageUrl}",`}</p>}
  
          {/* Mostrar captionResult si está presente */}
          {analysisResult.captionResult && (
            <div>
              <p>{`  "captionResult": {`}</p>
              <p>{`    "text": "${analysisResult.captionResult.text}",`}</p>
              <p>{`    "confidence": ${analysisResult.captionResult.confidence},`}</p>
              <p>{'  },'}</p>
            </div>
          )}
  
          {/* Mostrar objectsResult si está presente */}
          {analysisResult.objectsResult && analysisResult.objectsResult.values && (
            <div>
              <p>{`  "objectsResult": {`}</p>
              <p>{'    "values": ['}</p>
              {analysisResult.objectsResult.values.map((obj, index) => (
                <div key={index}>
                  <p>{'      {'}</p>
                  <p>{`        "boundingBox": { "x": ${obj.boundingBox.x}, "y": ${obj.boundingBox.y}, "w": ${obj.boundingBox.w}, "h": ${obj.boundingBox.h} },`}</p>
                  <p>{'        "tags": ['}</p>
                  {obj.tags.map((tag, tagIndex) => (
                    <div key={tagIndex}>
                      <p>{'          {'}</p>
                      <p>{`            "name": "${tag.name}", "confidence": ${tag.confidence}`}</p>
                      <p>{'          }' + (tagIndex < obj.tags.length - 1 ? ',' : '')}</p>
                    </div>
                  ))}
                  <p>{'        }' + (index < analysisResult.objectsResult.values.length - 1 ? ',' : '')}</p>
                </div>
              ))}
              <p>{'    ]'}</p>
              <p>{'  },'}</p>
            </div>
          )}
  
          {/* Mostrar categories si está presente */}
          {categories && categories.length > 0 && (
            <div>
              <p>{`  "categories": [`}</p>
              {categories.map((category, index) => (
                <div key={index}>
                  <p>{'    {'}</p>
                  <p>{`      "name": "${category.name}",`}</p>
                  <p>{`      "score": ${category.score}`}</p>
                  <p>{'    }' + (index < categories.length - 1 ? ',' : '')}</p>
                </div>
              ))}
              <p>{'  ],'}</p>
            </div>
          )}
  
          {/* Mostrar metadata si está presente */}
          {metadata && (
            <div>
              <p>{`  "metadata": {`}</p>
              <p>{`    "format": "${metadata.format}",`}</p>
              <p>{`    "height": ${metadata.height},`}</p>
              <p>{`    "width": ${metadata.width}`}</p>
              <p>{'  },'}</p>
            </div>
          )}
  
          <p>{"}"}</p>
        </div>
      );
    }
  
    return null;
  };  

  return (
    <div>
      <h1>Analyze and Generate Images with Azure AI</h1>
      <label>Insert URL or type prompt:</label>
      <br />
      <input
        type="text"
        value={imageUrl}
        onChange={handleImageUrlChange}
        placeholder="Enter URL to analyze or textual prompt to generate an image"
      />
      <br />
      <button onClick={handleImageAnalysisClick}>Analyze</button>
      <button onClick={handleImageGenerationClick}>Generate</button>

      {/* Mostrar los resultados */}
      <DisplayResults />
    </div>
  );
}

export default App;
