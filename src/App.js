import { useState, useRef, useEffect } from "react";
import "./App.css";
import { generateStory } from "./services/generateStory.service";
import { constants } from "./constants/constant";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
  Input
} from "@nextui-org/react";

function App() {
  //All the constants
  const ageGroups = constants.ageGroups;
  const readTimes = constants.readTimes;
  const settings = constants.settings;
  const [ageRange, setAgeRange] = useState(ageGroups[0]);
  const [readTime, setReadTime] = useState(readTimes[0].value);
  const [setting, setSetting] = useState(settings[0]);
  const [cutsomSetting, setCustomSetting] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [images, setImages] = useState([]);  
  const storyDivRef = useRef(null);

  useEffect(() => {
    if (storyDivRef.current && isSubmitting === false) {
      storyDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isSubmitting])

  // Creates the paragraph element and adjusts images accordingly
  const displayTextAndImages = (story, images) => {
    // Array to store the positions for images
    const paragraphs = story.split('\n');
    const para_count = paragraphs.length;
    const image_count = images.length;
    const positions = [];
    
    if (image_count > 0) {
      positions.push(1);
      const remainingImages = image_count - 1;
      const remainingParagraphs = para_count - 1;
      const gap = remainingParagraphs / remainingImages;
      for (let i = 0; i < remainingImages; i++) {
        const position = Math.round((i + 1) * gap) + 1;
        if (position >= 1 && position < para_count && !positions.includes(position)) {
          positions.push(position);
        }
      }
    }
    positions.sort((a, b) => a - b);
    return paragraphs.map((para, index) => (
      <div>
        <p className="border-solid">{para}</p>
        {positions.indexOf(index) !== -1 && 
          <div class="w-full flex justify-center">
            <img src={images[positions.indexOf(index)]['url']} alt={images[positions.indexOf(index)]['description']} />
          </div>
        }
      </div>
    ))
  }

  // Handles events whenever the submit button is clicked
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = {
      ageRange: ageRange,
      readTime: readTime,
      setting: setting === "Custom" ? cutsomSetting : setting,
    };
    console.log(formData);

    try {
      const data = await generateStory(formData);
      setStory(data.story);
      setTitle(data.title);
      setImages(data.images);
    } catch (error) {
      console.log(error);
      setStory('Something went wrong please try again later');
      setImages([])
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App flex flex-col md:flex-row h-screen w-screen">
      <div className="container flex flex-col justify-center items-center p-5 border-2 h-full">
        <form onSubmit={handleSubmit}>
          <div className="inputs flex flex-col gap-3 justify-center items-center">
            <h2>Choose Age Range</h2>
            <RadioGroup
              className="items-center"
              orientation="horizontal"
              value={ageRange}
              onValueChange={setAgeRange}
            >
              {ageGroups.map((ageRange, index) => (
                <Radio key={index} value={ageRange}>
                  {ageRange}
                </Radio>
              ))}
            </RadioGroup>
          </div>
          <div className="inputs flex flex-col gap-3 justify-center items-center">
            <h2>Choose Story Length</h2>
            <RadioGroup
              orientation="horizontal"
              value={readTime}
              onValueChange={setReadTime}
              className=""
            >
              {readTimes.map((time, index) => (
                <Radio key={index} value={time.value}>
                  {time.display}
                </Radio>
              ))}
            </RadioGroup>
          </div>
          <div className="inputs flex flex-col gap-3 justify-center items-center">
            <h2>Choose a setting</h2>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="bordered">{setting}</Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={setting}
                onSelectionChange={(keys) =>
                  setSetting(settings[Array.from(keys)[0]])
                }
              >
                {settings.map((option, index) => (
                  <DropdownItem key={index} value={option}>
                    {option}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="inputs flex justify-center items-center ">
            {setting === "Custom" && (
              <Input
                size="md"
                type="text"
                label="Setting"
                className=""
                value={cutsomSetting}
                onChange={(e) => setCustomSetting(e.target.value)}
              />
            )}
          </div>
          <div className="inputs flex justify-center items-center">
            <Button
              type="submit"
              isLoading={isSubmitting}
              radius="full"
              variant="ghost"
              size="lg"
              className="text-black shadow-lg"
            >
              {isSubmitting ? "Submitting...." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
      {story && (
        <div ref={storyDivRef} className="story-container flex flex-col justify-center items-center border-2 border-solid">
          <span className="title">{title}</span>        
            <div className="story border-solid border-2">
              {
                displayTextAndImages(story,images)
              }
            </div>
          
        </div>
      )}
    </div>
  );
}

export default App;
