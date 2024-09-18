'use client';

import Image from 'next/image';
import {createPngDataUri} from 'unlazy/thumbhash'

export function Photo({
  src,
  title,
  priority,
}: {
  src: string;
  title: string;
  priority: boolean;
}) {
  const RAINBOW_BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAJ0lEQVR42mP8/5+hP6K1kcmYZ2dgYAAHzmEX/pn5B0ZFyB2McDqw7hgApIAK82LwWhgAAAABJRU5ErkJggg==";

  const baseUrl = 'https://test.create.diagnal.com/'
  const DEFAULT_IMAGE_URL = 'p-missing.png'; // Adjust the path to your default image

  
    
  const imageUrl=  src && src !== "posterthatismissing.jpg" ? `${baseUrl}images/${src}` : '/p-missing.png';
  console.log(imageUrl)
  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-muted shadow-md mb-1">
      <Image
        alt=''
        src={imageUrl}
         blurDataURL={RAINBOW_BLUR_DATA_URL}
         placeholder="blur"
         fill
        sizes="(min-width: 1280px) 14vw, (min-width: 1024px) 16vw, (min-width: 768px) 20vw, (min-width: 640px) 25vw, 33vw"
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
