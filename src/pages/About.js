// src/pages/About.js
import React from 'react';

function About() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fffdfa', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '30px' }}>About Me</h1>
        <p style={{ fontSize: '22px', lineHeight: '1.8', marginBottom: '30px' }}>
          Hi, my name is Bayram Furkan Bayar, and I’m a Software Developer based in Toronto, Canada.
        </p>
        <p style={{ fontSize: '22px', lineHeight: '1.8', marginBottom: '30px' }}>
          I currently work at the Government of Ontario, where I develop scalable web applications and tackle complex problems using modern technologies.
        </p>
        <p style={{ fontSize: '22px', lineHeight: '1.8', marginBottom: '30px' }}>
          My areas of interest include Web Development, Distributed Systems, Cloud Technologies, and AI Applications. I also enjoy photography, tennis, and working on community-driven projects.
        </p>
        <p style={{ fontSize: '22px', lineHeight: '1.8', marginBottom: '30px' }}>
          If you have any questions or want to get in touch, email me at: bfurkanbayar@gmail.com
        </p>
        <p style={{ fontSize: '22px', lineHeight: '1.8', marginBottom: '30px' }}>You can also find me on:</p>
        <ul style={{ fontSize: '22px', lineHeight: '1.8', listStyle: 'none', paddingLeft: 0 }}>
          <li>For my photos and personel life on Instagram <a href="https://instagram.com/furknbayr" style={{ color: '#0077B5' }}>@furknbayr</a></li>
          <li>Follow me on <a href="https://linkedin.com/in/furkanbayar" style={{ color: '#0077B5' }}>LinkedIn Profile</a></li>
          <li>For My Projects  <a href="https://github.com/BFurkan" style={{ color: '#0077B5' }}>Github/Bfurkan</a></li>
          <li>Follow me on Twitter <a href="https://x.com/beardedhoood" style={{ color: '#0077B5' }}>@bfurkanbayar</a></li>
        </ul>
      </div>
    </div>
  );
}

export default About;
