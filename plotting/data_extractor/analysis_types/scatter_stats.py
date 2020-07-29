import netCDF4 as netCDF
from extraction_utils import basic_scatter
import json

class ScatterStats(object):
	"""docstring for BasicStats"""
	def __init__(self, filenames):
		super(ScatterStats, self).__init__()

		self.filenames = filenames

		#for _, val in filenames.items():
			#self.variable1, self.variable2 = list(filenames.keys())
		#	self.filenames.append(val)
		#self.filename1 = filenames[self.variable1]
		#self.filename2 = filenames[self.variable2]

	def process(self):

		print(self.filenames)
		if len(self.filenames) == 2:
			variables = list(self.filenames.keys())
			print("running basic processing on %s & %s" % (self.filenames[variables[0]], self.filenames[variables[1]]))
			netcdf_file1 = netCDF.Dataset(self.filenames[variables[0]], "r")
			netcdf_file2 = netCDF.Dataset(self.filenames[variables[1]], "r")

			return json.dumps(basic_scatter(netcdf_file1, variables[0], netcdf_file2, variables[1]))
		elif len(self.filenames) == 1:
			variables = list(self.filenames.keys())
			print("running basic processing on %s & %s" % (self.filenames[variables[0]], self.filenames[variables[0]]))
			netcdf_file1 = netCDF.Dataset(self.filenames[variables[0]], "r")
			netcdf_file2 = netCDF.Dataset(self.filenames[variables[0]], "r")

			return json.dumps(basic_scatter(netcdf_file1, variables[0], netcdf_file2, variables[0]))
		else:
			return "{}"
