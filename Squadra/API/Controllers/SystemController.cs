using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ApplicationCore.Entities;
using ApplicationCore.Interfaces;
using ApplicationCore.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class SystemController : ControllerBase
    {

        private readonly ApplicationCore.Interfaces.System.ISystemRepository _systemRepository;
        private readonly ApplicationCore.Interfaces.System.ISystemService _systemService;
        private readonly ApplicationCore.Interfaces.User.IUserRepository _userRepository;
        private readonly ApplicationCore.Interfaces.User.IUserService _userService;
        public SystemController(ApplicationCore.Interfaces.System.ISystemRepository systemRepository, ApplicationCore.Interfaces.System.ISystemService systemService, ApplicationCore.Interfaces.User.IUserRepository userRepository, ApplicationCore.Interfaces.User.IUserService userService)
        {
            _systemRepository = systemRepository;
            _systemService = systemService;
            _userRepository = userRepository;
            _userService = userService;
        }

        // POST: api/System
        [HttpPost]
        public async Task<HttpReturn> InsertSystem(ApplicationCore.Entities.System p_system)
        {
            var result = new HttpReturn();
            var v_system = await _systemService.Provide(p_system);
            if (v_system != null)
                result.status = "200";
            else result.status = "400";
            return result;
        }

        [HttpGet]
        public async Task<HttpReturn> GetSystem(string description, string initials, string email)
        {
            var result = new HttpReturn();
            var v_system = new ApplicationCore.Entities.System();
            v_system.description = description;
            v_system.initials = initials;
            v_system.email = email;
            result.system = new List<ApplicationCore.Entities.System>();
            var listsystem = await _systemService.GetSystem(v_system);
            if (listsystem != null)
            {
                result.status = "200";
                result.system = listsystem;
            }
            else result.status = "400";
            return result;
        }

        [HttpGet]
        public async Task<HttpReturn> GetForEdit(int id)
        {
            var result = new HttpReturn();
            var aux = new List<ApplicationCore.Entities.System>();
            aux.Add(await _systemRepository.GetByIDAsync(id));
            result.system = aux;
            if (aux != null)
                result.status = "200";
            else result.status = "400";
            return result;
        }

        [HttpPut]
        public async Task<HttpReturn> UpdateSystem(int id, ApplicationCore.Entities.System v_system)
        {
            var result = new HttpReturn();
            v_system.ID = id;
            var p_system = await _systemRepository.GetByIDAsync(id);
            v_system.LastModificationDate = p_system.LastModificationDate;
            v_system.CreationDate = p_system.CreationDate;
            v_system = await _systemService.Provide(v_system);
            if (v_system != null)
                result.status = "200";
            else result.status = "400";
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody]User model)
        {
            TokenService _token = new TokenService();
            var user = _userService.Authenticate(model);

            // Verifica se o usuário existe
            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });

            // Gera o Token
            var token = _token.GenerateToken(user.Result);

            // Oculta a senha
            user.Result.Password = "";

            // Retorna os dados
            return new
            {
                user = user,
                token = token
            };
        }
    }
}
