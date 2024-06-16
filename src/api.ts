/**
 * Sends a completion request to the given API endpoint.
 *
 * @param {string} prompt - The prompt to send to the model.
 * @param {number} maxTokens - The maximum number of tokens to generate.
 * @returns {Promise<string>} - A promise that resolves to the completion result.
 */

export const sendCompletionRequest = async (
  prompt: string,
  maxTokens: number,
  platform: string
): Promise<string> => {
  const fullPrompt = `[INST] <<SYS>>\nBạn là công cụ tạo nội dung cho bài viết rao bán facebook một cách chân thật, tuyệt đối không thêm nội dung không liên quan và đặc biệt nhẩt định phải có số điện thoại liên hệ. Hãy tạo nội dung bài viết dựa vào những thông tin sau.\nCâu hỏi: ${prompt}\nTrả lời: [/INST]`;
  const data = {
    model: "llamappo",
    prompt: fullPrompt,
    max_tokens: maxTokens,
    temperature: 1,
    top_p: 0.9,
  };

  try {
    const response = await fetch(
      "https://c9f9-69-129-123-18.ngrok-free.app/v1/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const initialText = extractGeneratedText(JSON.stringify(result));
    const improvedText = await sendImprovementRequest(initialText, platform);

    return improvedText;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const extractGeneratedText = (responseJson: string): string => {
  try {
    const responseData = JSON.parse(responseJson);
    if (responseData.choices && responseData.choices.length > 0) {
      return responseData.choices[0].text;
    } else {
      throw new Error("No choices found in response.");
    }
  } catch (error) {
    console.error("Error extracting generated text:", error);
    throw error;
  }
};

const sendImprovementRequest = async (
  text: string,
  platform: string
): Promise<string> => {
  const data = {
    model: "llamappo",
    prompt: `[INST] <<SYS>>\nBạn là một trợ lý giúp cải thiện đoạn văn. Hãy cải thiện câu văn sau để hợp lý hơn và rõ ràng hơn nhưng phải sáng tạo và hay, tránh lặp từ:\n${text}\n[/INST]`,
    max_tokens: platform === "facebook" ? 800 : 300,
    temperature: 0.9,
    top_p: 0.9,
  };

  try {
    const response = await fetch(
      "https://a9ee-175-121-92-105.ngrok-free.app/v1/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const improvedText = extractGeneratedText(JSON.stringify(result));

    return improvedText;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
