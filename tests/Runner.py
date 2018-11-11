from unittest import TestLoader, TestSuite, TextTestRunner

from authTests.PostUserTests import PostUserTests
from routesTests.ChartsTests import ChartsTests


if __name__ == '__main__':
   loader = TestLoader()
   suite = TestSuite(
      (
         loader.loadTestsFromTestCase(PostUserTests),
         loader.loadTestsFromTestCase(ChartsTests)
      )
   )

   runner = TextTestRunner()
   runner.run(suite)
