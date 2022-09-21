module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'answers',
      'owner_id',
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
      'question_id',
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
      'owner_id',
    );
    await queryInterface.removeColumn(
      'answers',
      'question_id',
    );
  },
};
