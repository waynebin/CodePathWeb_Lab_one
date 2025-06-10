import React from 'react';
import Card from './Card';
import freecodecamp from './assets/Screenshot_5-6-2025_19125_www.freecodecamp.org.jpeg';
import w3schools from './assets/Screenshot_10-6-2025_111819_www.w3schools.com.jpeg';
import khanacademy from './assets/Screenshot_10-6-2025_112427_www.khanacademy.org.jpeg';
import edx from './assets/Screenshot_10-6-2025_112328_www.edx.org.jpeg';
import Udacity from './assets/Screenshot_10-6-2025_112152_www.udacity.com.jpeg';
import codeacademy from './assets/Screenshot_10-6-2025_123457_www.codecademy.com.jpeg';
import datacamp from './assets/Screenshot_10-6-2025_123339_www.datacamp.com.jpeg';
import learnpython from './assets/Screenshot_10-6-2025_122843_www.learnpython.org.jpeg';
import udemy from './assets/Screenshot_10-6-2025_122559_www.udemy.com.jpeg';
import codepath from './assets/Screenshot_10-6-2025_12279_www.codepath.org.jpeg';


const CardContainer = () => {
    
  const cardData = [
    {
      id: 1,
      image: freecodecamp,
      title: 'FreeCodeCamp ',
      description: 'FreeCodeCamp is a nonprofit organization that offers free coding tutorials and resources.'
    },
    {
      id: 2,
      image: w3schools,
      title: 'W3Schools',
      description: 'W3Schools is a web developer information website that provides tutorials and references on web development languages.'
    },
    {
      id: 3,
      image: Udacity,
      title: 'Udacity',
      description: 'Udacity is an online learning platform that offers courses in programming, data science, and more.'
    }
    ,
    {
      id: 4,
      image: khanacademy,
      title: 'Khan Academy',
      description: 'Khan Academy is a nonprofit educational organization that provides free online courses, lessons, and practice in various subjects.'
    },
    {
      id: 5,
      image: edx,
      title: 'edX',
      description: 'edX is an online learning platform offering university-level courses in a wide range of disciplines.'
    },
    {
      id: 6,
      image: codepath,
      title: 'CodePath',
      description: 'CodePath is an organization that offers software engineering courses and resources.'
    }
    ,
    {
      id: 7,
      image: codeacademy,
      title: 'Codecademy',
      description: 'Codecademy is an online platform that offers interactive coding lessons in various programming languages.'
    }
    ,
    {
      id: 8,
      image: datacamp,
      title: 'DataCamp',
      description: 'DataCamp is an online learning platform that offers courses in data science and analytics.'
    },

    {
      id: 9,
      image: learnpython,
      title: 'Learn Python',
      description: 'Learn Python is an online platform that offers interactive Python programming tutorials and resources.'
    }

    ,
    {
      id: 10,
      image: udemy,
      title: 'Udemy',
      description: 'Udemy is an online learning platform that offers a wide variety of courses in many subjects.'
    }


    










  ];

  return (
    <div className="card-container">
      {cardData.map(card => (
        <Card
          key={card.id}
          image={card.image}
          title={card.title}
          description={card.description}
          alt={card.title}
        />
      ))}
    </div>
  );
};

export default CardContainer;