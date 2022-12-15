import React, { useEffect } from 'react'
import { Carousel, Image } from 'antd'

import './About.css'

const contentStyle = {
  margin: 0,
  height: '100vh',
  color: '#fff',
  background: 'transparent',
  position: 'relative',
  top: '20em',
}

export default function AboutPage() {
  useEffect(() => {
    document.body.classList.add('info-body')

    return () => document.body.classList.remove('info-body')
  })

  return (
    <Carousel
      autoplay
      autoplaySpeed={3000}
      dotPosition={'left'}
      effect="fade"
      style={{
        height: '80vh',
        width: '90vw',
        position: 'absolute',
      }}
    >
      <div>
        <div style={{ ...contentStyle, marginLeft: '15%' }}>
          <h2 className="about-name">About Us</h2>
          <p className="about-description" align="justify">
            <br />
            Piedmont, or mountain, glaciers are found in many parts of the
            world. In North America they are distributed along the mountain
            ranges of the Pacific Coast from central California northward. They
            abound in the Andes range in South America and are familiar and
            greatly admired spectacles in the Alps, the Pyrenees, the Caucasus
            Mountains and the mountains of Scandanavia. Rivers of ice flow down
            the valleys of various Asian mountain ranges, including the
            Himalayas, the Hindu Kush, and the Karakoram and Kunlun ranges. They
            are also a feature of the Southern Alps of New Zealand and are found
            in the lofty mountains of New Guinea. The largest piedmont glaciers
            are the Malaspina and Bering glaciers, both in Alaska.
          </p>
          {/* <img
            className="about-image"
            alt="asddd"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          /> */}
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <h2 className="about-name">John Doe</h2>
          <p className="about-description" align="justify">
            <br />
            Generating random paragraphs can be an excellent way for writers to
            get their creative flow going at the beginning of the day. The
            writer has no idea what topic the random paragraph will be about
            when it appears. This forces the writer to use creativity to
            complete one of three common writing challenges. The writer can use
            the paragraph as the first one of a short story and build upon it. A
            second option is to use the random paragraph somewhere in a short
            story they create. The third option is to have the random paragraph
            be the ending paragraph in a short story. No matter which of these
            challenges is undertaken, the writer is forced to use creativity to
            incorporate the paragraph into their writing.
          </p>
          <img
            className="about-image"
            alt="asddd"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <h2 className="about-name">Ben Stiler</h2>
          <p className="about-description" align="justify">
            <br />A random paragraph can also be an excellent way for a writer
            to tackle writers' block. Writing block can often happen due to
            being stuck with a current project that the writer is trying to
            complete. By inserting a completely random paragraph from which to
            begin, it can take down some of the issues that may have been
            causing the writers' block in the first place.
          </p>
          <img
            className="about-image"
            alt="asddd"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            width={300}
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <h2 className="about-name">Toby Mcguire</h2>
          <p className="about-description" align="justify">
            <br />
            Another productive way to use this tool to begin a daily writing
            routine. One way is to generate a random paragraph with the
            intention to try to rewrite it while still keeping the original
            meaning. The purpose here is to just get the writing started so that
            when the writer goes onto their day's writing projects, words are
            already flowing from their fingers.
          </p>
          <img
            className="about-image"
            alt="asddd"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            width={300}
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <h2 className="about-name">Lanna Rae</h2>
          <p className="about-description" align="justify">
            <br />
            Another writing challenge can be to take the individual sentences in
            the random paragraph and incorporate a single sentence from that
            into a new paragraph to create a short story. Unlike the random
            sentence generator, the sentences from the random paragraph will
            have some connection to one another so it will be a bit different.
            You also won't know exactly how many sentences will appear in the
            random paragraph.
          </p>
          <img
            className="about-image"
            alt="asddd"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            width={300}
          />
        </div>
      </div>
    </Carousel>
  )
}
