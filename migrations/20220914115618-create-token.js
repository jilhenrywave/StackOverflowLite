module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      token: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      modifiedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('tokens');
  },
};
