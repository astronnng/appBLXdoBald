from src.config.database import Base
from src.models.models import *
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# este é o objeto de configuração do Alembic, que fornece
# acesso aos valores do arquivo .ini em uso.
config = context.config

# Interpretar o arquivo de configuração para o logging do Python.
# Esta linha configura os loggers.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# adicione aqui o objeto MetaData dos seus modelos
# para suporte a 'autogenerate'
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = Base.metadata

# outros valores da configuração, definidos pelas necessidades de env.py,
# podem ser obtidos:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Executa migrações em modo 'offline'.

    Isso configura o contexto apenas com uma URL
    e não com um Engine, embora um Engine também seja aceitável.
    Ao pular a criação do Engine, nem precisamos que um DBAPI esteja disponível.

    Chamadas a context.execute() aqui emitem a string fornecida para
    a saída do script.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Executa migrações em modo 'online'.

    Nesse cenário precisamos criar um Engine
    e associar uma conexão ao contexto.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
