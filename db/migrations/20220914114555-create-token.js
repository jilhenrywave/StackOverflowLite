module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      token: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      modified_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, { underscored: true });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('tokens');
  },
};
