module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'votes',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          autoIncrement: false,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        answer_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'answers',
            key: 'id',
          },
        },
      },
      {
        underscored: true,
        indexes: [{ unique: true, fields: ['user_id', 'answer_id'] }],
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('votes');
  },
};