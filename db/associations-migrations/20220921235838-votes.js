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
        type: {
          type: Sequelize.STRING,
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
      },
      {
        underscored: true,
        uniqueKeys: { vote_entry: { fields: ['user_id', 'answer_id', 'type'] } },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('votes');
  },
};
