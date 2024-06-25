import React from 'react';

const Home = () => {
  const cards = [
    { title: 'Card 1', description: 'This is the description for card 1.' },
    { title: 'Card 2', description: 'This is the description for card 2.' },
    { title: 'Card 3', description: 'This is the description for card 3.' },
  ];

  return (
    <div className="container mx-auto py-10 mt-20"> {/* Added mt-20 for top margin */}
      <h1 className="text-4xl font-bold text-center mb-8">Home</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
            <p className="text-gray-700">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
