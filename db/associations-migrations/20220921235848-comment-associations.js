module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'comments',
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
      'comments',
      'answer_id',
      {
        type: Sequelize.UUID,
        allowNull: false,
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
      'comments',
      'owner_id',
    );

    await queryInterface.removeColumn(
      'comments',
      'answer_id',
    );
  },
};
