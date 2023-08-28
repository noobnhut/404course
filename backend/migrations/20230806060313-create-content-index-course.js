'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('content_index_courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_index: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'index_courses',
          key: 'id'
        }
      },
      title_content: {
        type: Sequelize.STRING
      },
      description_content: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('video','document')
      },
      link_video: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('content_index_courses');
  }
};