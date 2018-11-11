import json
from unittest import main
import requests

from TestConfiguration import TestConfiguration

class PostSessionTests(TestConfiguration):

   def setUp(self):
      self.url = self.baseUrl + '/users/sessions'
      
      url = self.baseUrl + '/users'
      body = {
         'firstName' : 'Dave',
         'lastName' : 'Janzen',
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'Stockd2g'
      }
      response = requests.post(url=url, data=json.dumps(body), headers=self.headers)


   def test_login_user(self):
      body = {
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'Stockd2g'
      }
      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 200)
         self.assertTrue('userId' in responseData)
         self.assertTrue(responseData['userId'] > 0)
         self.assertTrue('token' in responseData)
         self.assertTrue(responseData['token'] != "")
      except AssertionError as e:
         self.log.error(responseData)
         raise e 


   def test_login_user_noEmail(self):
      body = {
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


   def test_login_user_noPassword(self):
      body = {
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

   def test_login_user_noBody(self):
      body = {
      }
      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 400)
         self.assertEquals(len(responseData), 2)
      except AssertionError as e:
         self.log.error(responseData)
         raise e 


   def test_login_user_invalidEmail(self):
      body = {
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


   def test_login_user_nonExistentEmail(self):
      body = {
         'email' : 'steph.curry@gmail.com',
         'password' : 'Stockd2g'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 401)
         self.assertTrue('NonexistentUser' in responseData)
         self.assertEquals(responseData['NonexistentUser'], 'User does not exist.')
      except AssertionError as e:
         self.log.error(response.json())
         raise e


   def test_login_user_wrongPassword(self):
      body = {
         'email' : 'dave.janzen18@gmail.com',
         'password' : 'Stockd1g'
      }

      response = requests.post(url=self.url, data=json.dumps(body), headers=self.headers)
      responseData = response.json()
      try:
         self.assertEquals(response.status_code, 401)
         self.assertTrue('PasswordMismatch' in responseData)
         self.assertEquals(responseData['PasswordMismatch'], 'Incorrect password for user.')
      except AssertionError as e:
         self.log.error(response.json())
         raise e


   def tearDown(self):
      self.cursor.execute("DELETE FROM User")
      self.cursor.execute("ALTER TABLE User AUTO_INCREMENT=1")