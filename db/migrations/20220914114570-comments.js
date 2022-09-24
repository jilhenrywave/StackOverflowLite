module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable('comments');
  },
};
