import json
from unittest import main
import requests

from TestConfiguration import TestConfiguration

class PostUserTests(TestConfiguration):

   def setUp(self):
      self.url = self.baseUrl + '/users'

   def test_register_user(self):
      body = {
         'firstName' : 'Dave',
         'lastName' : 'Janzen',
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'Stockd2g'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      try:
         self.assertEquals(response.status_code, 200)
      except AssertionError as e:
         self.log.error(response.json())
         raise e

   
   def test_register_user_noFirstName(self):
      body = {
         'lastName' : 'Janzen',
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'Stockd2g'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('MissingField' in responseData[0])
         self.assertEquals(responseData[0]['MissingField'], 'firstName is a required field')
      except AssertionError as e:
         self.log.error(responseData)
         raise e


   def test_register_user_noLastName(self):
      body = {
         'firstName' : 'Janzen',
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'Stockd2g'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('MissingField' in responseData[0])
         self.assertEquals(responseData[0]['MissingField'], 'lastName is a required field')
      except AssertionError as e:
         self.log.error(responseData)
         raise e

   
   def test_register_user_noEmail(self):
      body = {
         'firstName' : 'Janzen',
         'lastName' : 'Barkley',
         'password' : 'Stockd2g'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('MissingField' in responseData[0])
         self.assertEquals(responseData[0]['MissingField'], 'email is a required field')
      except AssertionError as e:
         self.log.error(responseData)
         raise e


   def test_register_user_noPassword(self):
      body = {
         'firstName' : 'Janzen',
         'lastName' : 'Barkley',
         'email' : 'dave.janzen18@gmail.com'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('MissingField' in responseData[0])
         self.assertEquals(responseData[0]['MissingField'], 'password is a required field')
      except AssertionError as e:
         self.log.error(responseData)
         raise e


   def test_register_user_noBody(self):
      body = {
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertEquals(len(responseData), 4)
      except AssertionError as e:
         self.log.error(responseData)
         raise e


   def test_register_user_invalidFirstName(self):
      body = {
         'firstName' : 14321,
         'lastName' : 'Janzen',
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'Stockd2g'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('InvalidField' in responseData[0])
         self.assertEquals(responseData[0]['InvalidField'], 'firstName is not a string or formatted incorrectly')
      except AssertionError as e:
         self.log.error(response.json())
         raise e


   def test_register_user_invalidLastName(self):
      body = {
         'firstName' : 'Davison',
         'lastName' : False,
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'Stockd2g'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('InvalidField' in responseData[0])
         self.assertEquals(responseData[0]['InvalidField'], 'lastName is not a string or formatted incorrectly')
      except AssertionError as e:
         self.log.error(response.json())
         raise e


   def test_register_user_invalidEmail(self):
      body = {
         'firstName' : 'Davison',
         'lastName' : 'Fuller',
         'email' : 'dave.janzegmail.com',
         'password' : 'Stockd2g'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('InvalidField' in responseData[0])
         self.assertEquals(responseData[0]['InvalidField'], 'email is an invalid address')
      except AssertionError as e:
         self.log.error(response.json())
         raise e


   def test_register_user_invalidPassword_noNumbers(self):
      body = {
         'firstName' : 'Davison',
         'lastName' : 'Fuller',
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'NoNumber'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('InvalidField' in responseData[0])
         self.assertEquals(responseData[0]['InvalidField'], "password must have 8 characters, 1 uppercase letter " +
            "1 lowercase letter, and 1 number")
      except AssertionError as e:
         self.log.error(response.json())
         raise e


   def test_register_user_invalidPassword_noLetters(self):
      body = {
         'firstName' : 'Davison',
         'lastName' : 'Fuller',
         'email' : 'dave.janzen18@gmail.com',
         'password' : '12345678'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('InvalidField' in responseData[0])
         self.assertEquals(responseData[0]['InvalidField'], "password must have 8 characters, 1 uppercase letter " +
            "1 lowercase letter, and 1 number")
      except AssertionError as e:
         self.log.error(response.json())
         raise e


   def test_register_user_invalidPassword_tooShort(self):
      body = {
         'firstName' : 'Davison',
         'lastName' : 'Fuller',
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'hi1A'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('InvalidField' in responseData[0])
         self.assertEquals(responseData[0]['InvalidField'], "password must have 8 characters, 1 uppercase letter " +
            "1 lowercase letter, and 1 number")
      except AssertionError as e:
         self.log.error(response.json())
         raise e

   
   def test_register_user_invalidPassword_lowercaseOnly(self):
      body = {
         'firstName' : 'Davison',
         'lastName' : 'Fuller',
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'abcdefghijk13'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('InvalidField' in responseData[0])
         self.assertEquals(responseData[0]['InvalidField'], "password must have 8 characters, 1 uppercase letter " +
            "1 lowercase letter, and 1 number")
      except AssertionError as e:
         self.log.error(response.json())
         raise e

   
   def test_register_user_invalidPassword_UppercaseOnly(self):
      body = {
         'firstName' : 'Davison',
         'lastName' : 'Fuller',
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'ABCDEFGHI131'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertTrue('InvalidField' in responseData[0])
         self.assertEquals(responseData[0]['InvalidField'], "password must have 8 characters, 1 uppercase letter " +
            "1 lowercase letter, and 1 number")
      except AssertionError as e:
         self.log.error(response.json())
         raise e

   
   def test_register_user_duplicateEmail(self):
      body = {
         'firstName' : 'Davison',
         'lastName' : 'Fuller',
         'email' : 'dave.fuler@gmail.com',
         'password' : 'normaLpas1'
      }
      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      try:
         self.assertEquals(response.status_code, 200)
      except AssertionError as e:
         self.log.error(response.json())
         raise e

      responseDuplicate = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = responseDuplicate.json()
      try:
         self.assertEquals(responseDuplicate.status_code, 400)
         self.assertTrue('DuplicateEmail' in responseData)
         self.assertEquals(responseData['DuplicateEmail'], 'User with email already exists.')
      except AssertionError as e:
         self.log.error(responseData)
         raise e


if __name__ == "__main__":
   main()