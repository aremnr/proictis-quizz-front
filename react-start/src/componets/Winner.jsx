import React from 'react';
import '../Leaderboard.css'; // Добавим стили

const Leaderboard = () => {
  // Данные игроков
  const players = [
    { place: 1, name: 'Игрок' },
    { place: 2, name: 'Игрок' },
    { place: 3, name: 'Игрок' },
    { place: 4, name: 'Игрок' },
    { place: 5, name: 'Игрок' },
    { place: 6, name: 'Игрок' },
    { place: 7, name: 'Игрок' },
    { place: 8, name: 'Игрок' },
    { place: 9, name: 'Игрок' },
    { place: 10, name: 'Игрок' },
  ];

  return (
    <div className="leaderboard-container">
      <h2>Все игроки</h2>
      <table>
        <tbody>
          {players.map((player) => (
            <tr key={player.place}>
              <td>{player.place} место: {player.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;