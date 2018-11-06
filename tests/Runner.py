from unittest import TestLoader, TestSuite, TextTestRunner

from ChartsTests import ChartsTests


if __name__ == '__main__':
   loader = TestLoader()
   suite = TestSuite(
      (
         loader.loadTestsFromTestCase(ChartsTests)
      )
   )

   runner = TextTestRunner()
   runner.run(suite)
