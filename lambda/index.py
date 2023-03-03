import json
import logging
import os


# Setup logging
logger = logging.getLogger(os.environ['AWS_LAMBDA_FUNCTION_NAME'])
logger.setLevel(logging.INFO)


def main(event, context):

    logger.info("Received event: %s" % json.dumps(event))