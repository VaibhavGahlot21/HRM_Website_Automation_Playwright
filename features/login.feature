# features/user_management.feature
@userManagement
Feature: OrangeHRM User Management
  As an Admin user
  I want to manage system users
  So that I can control access to the HRM system

  Background:
    Given I am on the OrangeHRM login page

  @login @smoke
  Scenario: Successful admin login
    When I login with valid admin credentials
    Then I should be redirected to the Dashboard

  @addUser @smoke
  Scenario: Add a new Admin user successfully
    Given I am logged in as admin
    When I navigate to the Admin section
    And I click on the "Add" button
    And I fill in the Add User form with the following details:
      | Field         | Value         |
      | UserRole      | Admin         |
      | Employee Name | Vab 123       |
      | Status        | Enabled       |
      | Username      | testuser_bdd |
      | Password      | Test@1234!   |
    And I click the "Save" button
    Then I should see a success message

