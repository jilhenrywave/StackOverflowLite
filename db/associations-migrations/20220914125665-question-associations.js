module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'questions',
      'owner_id',
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
      'answer_id',
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
      'owner_id',
    );

    await queryInterface.removeColumn(
      'questions',
      'answer_id',
    );
  },
};
