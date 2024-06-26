from . import Extractor
from extraction_utils import WCSHelper, WCSRawHelper
import tempfile
import uuid

class BasicExtractor(Extractor):
	"""docstring for BasicExtractor"""
	def __init__(self, wcs_url, extract_dates, extract_area=None, extract_variable=None, extract_depth=None, outdir="/tmp"):
		super(BasicExtractor, self).__init__(wcs_url, extract_dates,  extract_area=extract_area, extract_variable=extract_variable, extract_depth=extract_depth, outdir=outdir)
		
	def getData(self):
		wcs_extractor = WCSRawHelper(self.wcs_url, self.extract_dates, self.extract_variable, self.extract_area, self.extract_depth)
		data = wcs_extractor.getData()
		fname = self.outdir+str(uuid.uuid4())+".nc"
		with open(fname, 'w') as outfile:
			outfile.write(data.read())
		return fname

if __name__ == '__main__':
	import sys
	import os
	sys.path.append(os.path.join(os.path.dirname(__file__)))
	BasicExtractor("http://container.geo.tuwien.ac.at:8484/thredds/wcs/C3S/combined/monthly/files/STACK_C3S-SOILMOISTURE_v202012_COMBINED_MONTHLY.nc",
				   ["2020-12-01", "2020-12-01"])