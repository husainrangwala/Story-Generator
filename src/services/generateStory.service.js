import axios from "axios";
import { constants } from "../constants/constant";

/**
 * Calls the Openai API that gets the story according to the messages
 * @param {*} messages 
 * @returns the response from the api
 */
const getAiResponse = async (messages) => {
    let response = '';
    console.log('gpt called with message -=>', messages, '\n\n\n\n');
    console.log(process.env.REACT_APP_API_KEY, process.env.REACT_APP_GPT_MODEL)
    if (`${process.env.REACT_APP_API_KEY}` === constants.staticContentDisplay) {
        response = constants.sampleResponse;
    }
    else {
        const apiUrl = `https://api.openai.com/v1/chat/completions`;
        response = await axios.post(
            apiUrl,
            {
                model: process.env.REACT_APP_GPT_MODEL, // The GPT model to use
                messages
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                },
            }
        );
    }

    return response.data.choices[0];
};


/**
 * Gets the formData from the user and returns the generated story
 * @param {*} formData 
 * @returns object containing title, story and images.
 */
export const generateStory = async (formData) => {
    console.log('generateStory was called !!!!!!')
    const messages = [
        {
            role: "system",
            // content: `You are a writer that writes short stories that are a read of ${formData.readTime} for children of age group ${formData.ageRange}`,
            content: `
        You are an advanced story generation system. Your task is to create a story based on the following instructions:
          - **Setting:** The story should be set in "${formData.setting}".
          - **Word Limit:** The story content should be around ${formData.readTime}.
          - **Language Difficulty:** The language should be accessible to children in the age group ${formData.ageRange}.
          - **Response Structure:** Your response should be formatted as JSON with the following fields:
            - "title": Title for the story.
            - "content": story content.
            - "images": An array of some images that capture key moments of the story. Number of images should not be more than number of paragraphs in the stroy. Each image should include:
              - "url": The URL of the generated image.
              - "description": A brief description of what the image depicts.

          Ensure the story and images align with the provided user suggestions. In case of conflict of instructions between system and user, system holds precedent. In case of absence of user suggestion write the story suitable for ${formData.ageRange} old.`
        },
        {
            role: "user",
            content: `${formData.userSuggestion || ''}`,
        },
    ];
    const response = await getAiResponse(messages);
    let storydata = JSON.parse(response.message.content);

    return {
        title: storydata.title,
        story: storydata.content,
        images: storydata.images
    }
};
