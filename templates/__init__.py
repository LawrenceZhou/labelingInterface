from flask import Flask, request
import flask as f
from flask_restful import Resource, Api
from flask_restful import reqparse
#from . import generateController
import json
import time

app = Flask(__name__,
 	static_folder = './public',
 	template_folder="./static")

ctx = {}
api = Api(app)


class CreateUser(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('email', type=str, help='Email address to create user')
            parser.add_argument('password', type=str, help='Password to create user')
            args = parser.parse_args()

            _userEmail = args['email']
            _userPassword = args['password']

            return {'Email': args['email'], 'Password': args['password']}

        except Exception as e:
            return {'error': str(e)}


class getValidationAccuracy(Resource):
    def post(self):
        try:
            # Parse the arguments
            #parser = reqparse.RequestParser()
            #parser.add_argument('email', type=str, help='Email address to create user')
            #parser.add_argument('password', type=str, help='Password to create user')
            #args = parser.parse_args()

            #_userEmail = args['email']
            #_userPassword = args['password']
            _accuracy = "48.2"

            return {'accuracy': _accuracy}

        except Exception as e:
            return {'error': str(e)}

class initiate(Resource):
    def post(self):
        try:
            #ctx["g"] = generateController.GenerateController('/home/yijun/Downloads/cat-mel_2bar_big.tar', "cat-mel_2bar_big", 4)
            return {'result': 'OK'}


        except Exception as e:
            print(str(e))
            return {'error': str(e)}


class destroy(Resource):
    def post(self):
        try:
            #ctx["g"].__del__()
            return {'result': 'OK'}


        except Exception as e:
            print(str(e))
            return {'error': str(e)}


class save(Resource):
    def post(self):
        try:
            content = request.json
            with open(time.ctime()+"_result.json",'a') as fd:
                json.dump(content, fd)
            return {'result': 'OK'}


        except Exception as e:
            print(str(e))
            return {'error': str(e)}


class sample(Resource):
    def post(self):
        try:
            #ctx["g"] = generateController.GenerateController('/home/yijun/Downloads/cat-mel_2bar_big.tar', "cat-mel_2bar_big", 512)
            content = request.json
            print(content, content['seed'], content['seed_type'], content['search_type'], content['search_num'])
            print(content['selected_ids'])
            #result = ctx["g"].generateSamples(content['seed'], content['seed_type'], content['search_type'], int(content['search_num']), content['selected_ids'], content['EorR'])
            return {'candidates': result}


        except Exception as e:
            print(str(e))
            return {'error': str(e)}

class interpolate(Resource):
    def post(self):
        try:
            content = request.json
            print(content['cids'], content['percents'], content['cstarts'], content['cends'])
            #r = ctx["g"].interpolate(content['cids'], content['percents'], content['cstarts'], content['cends'])
            print(r)
            #return {"result":r[0]}
        except Exception as e:
            return {'error': str(e)}

class update(Resource):
    def post(self):
        try:
            content = request.json
            print(content)
            #r = ctx["g"].boSearch(content['lastBest'], content['search_type'], content['startStep'], content['endStep'], content['EorR'])
            print(r)
            #print(r)
            return {"candidates":r}
        except Exception as e:
            print("error! ", e)
            return {'error': str(e)}

api.add_resource(CreateUser, '/CreateUser')

api.add_resource(getValidationAccuracy, '/getValidationAccuracy')

api.add_resource(interpolate, '/interpolate')

api.add_resource(sample, '/sample')

api.add_resource(update, '/update')

api.add_resource(initiate, '/initiate')

api.add_resource(destroy, '/destroy')

api.add_resource(save, '/save')

from templates.hello.views import hello_blueprint
# register the blueprints
app.register_blueprint(hello_blueprint)

#if __name__ == '__main__':
#    app.run(debug=True)