from flasgger import Swagger
from flask import Flask, jsonify, request
from flask_cors import CORS
from utils import get_random_int
# from flask_pypprof import get_pprof_blueprint
import pyroscope
import os

# Configure Pyroscope
pyroscope.configure(
    application_name = os.getenv("PYROSCOPE_APPLICATION_NAME", "flights"),
    server_address   = os.getenv("PYROSCOPE_SERVER_ADDRESS", "http://pyroscope.monitoring.svc.cluster.local:4040"),
    tags = {
        "region": os.getenv("REGION", "local"),
        "env": os.getenv("ENVIRONMENT", "production"),
    }
)

# import logging
import logging
from pythonjsonlogger import jsonlogger

logger = logging.getLogger(__name__)
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

# Begin the Flask app

app = Flask(__name__)
# app.register_blueprint(get_pprof_blueprint())
Swagger(app)
CORS(app)

@app.route('/health', methods=['GET'])
def health():
    """Health endpoint
    ---
    responses:
      200:
        description: Returns healthy
    """

    logger.info("Health check requested", extra={
      "custom_metadata_1": "metadata_value_1",
      "custom_metadata_2": "metadata_value_2"
    })

    return jsonify({"status": "healthy"}), 200

@app.route("/", methods=['GET'])
def home():
    """No-op home endpoint
    ---
    responses:
      200:
        description: Returns ok
    """

    logger.info("Homepage requested", extra={
      "custom_metadata_1": "metadata_value_1",
      "custom_metadata_2": "metadata_value_2"
    })

    return jsonify({"message": "ok"}), 200

@app.route("/flights/<airline>", methods=["GET"])
def get_flights(airline):
    """Get flights endpoint. Optionally, set raise to trigger an exception.
    ---
    parameters:
      - name: airline
        in: path
        type: string
        enum: ["AA", "UA", "DL"]
        required: true
      - name: raise
        in: query
        type: str
        enum: ["500"]
        required: false
    responses:
      200:
        description: Returns a list of flights for the selected airline
    """
    status_code = request.args.get("raise")
    if status_code:
      raise Exception(f"Encountered {status_code} error") # pylint: disable=broad-exception-raised
    random_int = get_random_int(100, 999)

    logger.info("Get flights requested", extra={
      "custom_metadata_1": "metadata_value_1",
      "custom_metadata_2": "metadata_value_2"
    })
    return jsonify({airline: [random_int]}), 200

@app.route("/flight", methods=["POST"])
def book_flight():
    """Book flights endpoint. Optionally, set raise to trigger an exception.
    ---
    parameters:
      - name: passenger_name
        in: query
        type: string
        enum: ["John Doe", "Jane Doe"]
        required: true
      - name: flight_num
        in: query
        type: string
        enum: ["101", "202", "303", "404", "505", "606"]
        required: true
      - name: raise
        in: query
        type: str
        enum: ["500"]
        required: false
    responses:
      200:
        description: Booked a flight for the selected passenger and flight_num
    """
    status_code = request.args.get("raise")
    if status_code:
      raise Exception(f"Encountered {status_code} error") # pylint: disable=broad-exception-raised
    passenger_name = request.args.get("passenger_name")
    flight_num = request.args.get("flight_num")
    booking_id = get_random_int(100, 999)

    logger.info("Flight endpoint requested", extra={
      "custom_metadata_1": "metadata_value_1",
      "custom_metadata_2": "metadata_value_2"
    })

    return jsonify({"passenger_name": passenger_name, "flight_num": flight_num, "booking_id": booking_id}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)
    
