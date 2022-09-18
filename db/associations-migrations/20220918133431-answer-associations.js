module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'answers',
      'ownerId',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );

    await queryInterface.addColumn(
      'answers',
      'questionId',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'answers',
      'ownerId',
    );
    await queryInterface.removeColumn(
      'answers',
      'questionId',
    );
  },
};
