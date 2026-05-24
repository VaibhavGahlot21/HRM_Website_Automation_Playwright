# features/user_management.feature
@userManagement
Feature: OrangeHRM User Management
  As an Admin user
  I want to manage system users
  So that I can control access to the HRM system

  Background:
    Given I am on the OrangeHRM login page

  @regression @addUser
  Scenario: Add a PIM employee and then add user with random role(Admin/ESS) and status
    Given I am logged in as admin
    When I navigate to the PIM section
    And I click on the Add Employee button
    And I add a random PIM employee
    Then I should be redirected to the PIM Employee List
    When I navigate to the Admin section
    And I click on the "Add" button
    And I fill in the Add User form for the added employee
    And I click the "Save" button
    Then I should see a success message
    Then I should see the newly created admin user in the user list

