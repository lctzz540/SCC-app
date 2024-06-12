/**
 * Sends a completion request to the given API endpoint.
 *
 * @param {string} prompt - The prompt to send to the model.
 * @param {number} maxTokens - The maximum number of tokens to generate.
 * @returns {Promise<Object>} - A promise that resolves to the completion result.
 */

export const sendCompletionRequest = async (
  prompt: string,
  maxTokens: number
): Promise<string> => {
  const fullPrompt = `[INST] <<SYS>>\nBạn là công cụ tạo nội dung cho bài viết rao bán facebook một cách chân thật, không thêm nội dung không liên quan. Hãy tạo nội dung bài viết dựa vào những thông tin sau.\nCâu hỏi: ${prompt}\nTrả lời: [/INST]`;
  const data = {
    model: "llamappo",
    prompt: fullPrompt,
    max_tokens: maxTokens,
    temperature: 1,
    top_p: 0.7,
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
    return extractGeneratedText(JSON.stringify(result));
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const extractGeneratedText = (responseJson: string): string => {
  try {
    const responseData = JSON.parse(responseJson);
    if (responseData.choices && responseData.choices.length > 0) {
      return removeSentencesAfter10Digits(responseData.choices[0].text);
    } else {
      throw new Error("No choices found in response.");
    }
  } catch (error) {
    console.error("Error extracting generated text:", error);
    throw error;
  }
};
const removeSentencesAfter10Digits = (inputString: string): string => {
  const matches = inputString.match(/(?:\D*\d){10,}/g);

  if (matches) {
    const lastMatchIndex = inputString.lastIndexOf(matches[matches.length - 1]);

    return inputString.slice(
      0,
      lastMatchIndex + matches[matches.length - 1].length
    );
  } else {
    return inputString;
  }
};
