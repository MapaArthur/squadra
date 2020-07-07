using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationCore.Entities;

namespace API.Controllers
{
    public class HttpReturn
    {
        public string status { get; set; }

        public List<ApplicationCore.Entities.System> system { get; set; }
    }
}
