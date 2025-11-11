using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;

namespace Poke.Application.Models
{
    public class BaseResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<string>? ValidationErrors { get; set; }

        public BaseResponse()
        {
        }

        public BaseResponse(bool status)
        {
            Success = status;
        }

        public BaseResponse(string message)
        {
            Success = true;
            Message = message;
        }

        public BaseResponse(string message, bool success)
        {
            Success = success; 
            Message = message;
        }

    }
}
