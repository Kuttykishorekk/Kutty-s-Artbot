import React, { useEffect, useState } from 'react';
import Typewriter from './typewriter';
import styles from './typewriter.module.css';
import Image from 'next/image';
import image0 from './images/astronaut.jpg';
import image1 from './images/amazon.jpg';
import image2 from './images/himalayas.jpg';
import image3 from './images/cabin.jpg';
import image4 from './images/mechanical_brain.jpg';
import image5 from './images/cake.jpg';
import image6 from './images/dino.jpg';
import image7 from './images/food.jpg';
import type { StaticImageData } from 'next/image';

interface ImageItem {
  file: StaticImageData;
  prompt: string;
  model: string;
}

const images: ImageItem[] = [
  {
    file: image0,
    prompt: 'An astronaut resting on Mars in a beach chair',
    model: 'stable_diffusion'
  },
  {
    file: image1,
    prompt:
      'A high tech solarpunk utopia in the Amazon rainforest with technology and nature mixed together',
    model: 'stable_diffusion'
  },
  {
    file: image2,
    prompt: 'Himalayan mountains in the style of Moebius',
    model: 'stable_diffusion'
  },
  {
    file: image3,
    prompt:
      'Mountain chalet covered in snow, foggy, sunrise, sharp details, sharp focus, elegant, highly detailed, illustration, by Jordan Grimmer and Greg Rutkowski',
    model: 'stable_diffusion'
  },
  {
    file: image4,
    prompt: 'Model of a steampunk mechanical brain',
    model: 'stable_diffusion'
  },
  {
    file: image5,
    prompt: 'Geologic cross section of a birthday cake, colored pencil drawing',
    model: 'SDXL'
  },
  {
    file: image6,
    prompt:
      'Happy people toasting and having a fine dinner outside on a patio while a menacing dinosaur is in the background',
    model: 'SDXL'
  },
  {
    file: image7,
    prompt:
      'macro photograph of a brisket on a table with beer, in a blurred restaurant with depth of field, bokeh, soft diffused light, professional food photography',
    model: 'SDXL'
  }
];

function shuffleArray(array: ImageItem[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function PromptTypewriter() {
  const [shuffled, setShuffled] = useState<ImageItem[]>([]);
  const [isHidden, setIsHidden] = useState(true);
  const [promptIndex, setPromptIndex] = useState(0);

  const handleImageChange = () => {
    setIsHidden(true);
    setTimeout(() => setIsHidden(false), 1000);
  };

  useEffect(() => {
    const shuffledImages = [...images];
    shuffleArray(shuffledImages);
    setShuffled(shuffledImages);
  }, []);

  if (shuffled.length === 0) {
    return null;
  }

  return (
    <div className={styles.ChatWrapper}>
      <div className={styles.ChatContainer}>
        <div className={styles.Message}>
          <Typewriter
            text={shuffled[promptIndex].prompt}
            onEraseDelay={handleImageChange}
            onEraseDone={() => {
              const nextIndex = (promptIndex + 1) % shuffled.length;
              setIsHidden(true);
              setTimeout(() => setPromptIndex(nextIndex), 350);
            }}
            eraseSpeed={15}
            eraseDelay={5000}
          />
        </div>
        <div
          className={`${styles.ImageWrapper} ${isHidden ? styles.hidden : styles.visible}`}
        >
          <Image
            alt="Prompt-related image"
            src={shuffled[promptIndex].file}
            layout="responsive"
            style={{ borderRadius: '4px', width: '100%' }}
          />
        </div>
        <div className={styles.ModelInfo}>
          created with <strong>{shuffled[promptIndex].model}</strong>
        </div>
      </div>
    </div>
  );
}
