module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'tokens', // name of Source model
      'userId', // name of the key we're adding
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn(
      'tokens',
      'userId',
    );
  },
};
