module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'questions',
      'ownerId',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );

    await queryInterface.addColumn(
      'questions',
      'answerId',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'answers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'questions',
      'ownerId',
    );

    await queryInterface.removeColumn(
      'questions',
      'answerId',
    );
  },
};
