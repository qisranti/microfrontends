using System;
using System.Collections.Generic;
using System.Text;

namespace Poke.Application.Models
{
    public class CreateCommandResponse<T> : BaseResponse
    {
        public T Entity { get; set; }

        public CreateCommandResponse(T createdEntity)
        {
            Entity = createdEntity;
        }
        public CreateCommandResponse(T createdEntity, string message, bool success) : base(message, success) 
        {
            Entity = createdEntity;
        }
    }
}
