from unittest import main

from TestConfiguration import TestConfiguration

class ChartsTests(TestConfiguration):

   def test_1_basic(self):
      self.assertEqual(1, 1)


if __name__ == "__main__":
   main()