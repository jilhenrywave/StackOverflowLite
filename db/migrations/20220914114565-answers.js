module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      votes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('answers');
  },
};
