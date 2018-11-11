import sys
from unittest import TestLoader, TestSuite, TextTestRunner

from authTests.PostUserTests import PostUserTests
from authTests.PostSessionTests import PostSessionTests
from authTests.DeleteSessionTests import DeleteSessionTests
from routesTests.ChartsTests import ChartsTests


if __name__ == '__main__':
   loader = TestLoader()
   suite = TestSuite(
      (
         loader.loadTestsFromTestCase(PostUserTests),
         loader.loadTestsFromTestCase(PostSessionTests),
         loader.loadTestsFromTestCase(DeleteSessionTests),
         loader.loadTestsFromTestCase(ChartsTests)
      )
   )
   runner = TextTestRunner()
   result = runner.run(suite)
   sys.exit(not result.wasSuccessful())
