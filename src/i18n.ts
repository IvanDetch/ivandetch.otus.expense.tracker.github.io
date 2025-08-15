import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const savedLng = typeof localStorage !== 'undefined' ? localStorage.getItem('lng') : null

const resources = {
  en: { translation: {
    pages: {
      nav: { operations: 'Operations', categories: 'Categories', profile: 'Profile' },
      login: { title: 'Login', orRegister: 'Or register' },
      register: { title: 'Register', hasAccount: 'Already have an account?' },
      profile: { title: 'Profile', changePassword: 'Change password' },
      operations: { title: 'Operations', new: 'New operation', edit: 'Edit operation' },
      categories: { title: 'Categories', new: 'New category', edit: 'Edit category' }
    },
    forms: {
      email: 'Email',
      password: 'Password',
      newPassword: 'New password',
      name: 'Name',
      signIn: 'Sign in',
      signUp: 'Sign up',
      amount: 'Amount',
      date: 'Date',
      type: 'Type',
      profit: 'Profit',
      cost: 'Cost',
      category: 'Category',
      desc: 'Description'
    },
    table: {
      name: 'Name', desc: 'Desc', amount: 'Amount', date: 'Date', type: 'Type', category: 'Category', actions: 'Actions', createdAt: 'Created', updatedAt: 'Updated'
    },
    actions: { create: 'Create', save: 'Save', cancel: 'Cancel', edit: 'Edit', delete: 'Delete', prev: 'Prev', next: 'Next', change: 'Change' },
    auth: { login: 'Login', register: 'Register', signOut: 'Sign out' },
    sorting: { asc: 'Asc', desc: 'Desc' },
    errors: {
      ERR_INTERNAL_SERVER: 'Internal server error',
      ERR_AUTH: 'Authorization error',
      ERR_FIELD_REQUIRED: 'Field is required',
      ERR_INVALID_QUERY_PARAMS: 'Invalid query parameters',
      ERR_NOT_VALID: 'Not valid',
      ERR_NO_FILES: 'No files uploaded',
      ERR_NOT_ALLOWED: 'Not allowed',
      ERR_NOT_FOUND: 'Not found',
      ERR_VALIDATION_ERROR: 'Validation error',
      ERR_ACCOUNT_ALREADY_EXIST: 'Account already exists',
      ERR_INVALID_PASSWORD: 'Invalid password',
      ERR_INCORRECT_PASSWORD: 'Incorrect password',
      ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Incorrect email or password'
    }
  }},
  ru: { translation: {
    pages: {
      nav: { operations: 'Операции', categories: 'Категории', profile: 'Профиль' },
      login: { title: 'Вход', orRegister: 'Или зарегистрируйтесь' },
      register: { title: 'Регистрация', hasAccount: 'Уже есть аккаунт?' },
      profile: { title: 'Профиль', changePassword: 'Смена пароля' },
      operations: { title: 'Операции', new: 'Новая операция', edit: 'Редактировать операцию' },
      categories: { title: 'Категории', new: 'Новая категория', edit: 'Редактировать категорию' }
    },
    forms: {
      email: 'E-mail',
      password: 'Пароль',
      newPassword: 'Новый пароль',
      name: 'Имя',
      signIn: 'Войти',
      signUp: 'Зарегистрироваться',
      amount: 'Сумма',
      date: 'Дата',
      type: 'Тип',
      profit: 'Доход',
      cost: 'Расход',
      category: 'Категория',
      desc: 'Описание'
    },
    table: {
      name: 'Название', desc: 'Описание', amount: 'Сумма', date: 'Дата', type: 'Тип', category: 'Категория', actions: 'Действия', createdAt: 'Создано', updatedAt: 'Обновлено'
    },
    actions: { create: 'Создать', save: 'Сохранить', cancel: 'Отмена', edit: 'Изменить', delete: 'Удалить', prev: 'Назад', next: 'Вперёд', change: 'Изменить' },
    auth: { login: 'Вход', register: 'Регистрация', signOut: 'Выйти' },
    sorting: { asc: 'По возрастанию', desc: 'По убыванию' },
    errors: {
      ERR_INTERNAL_SERVER: 'Внутренняя ошибка сервера',
      ERR_AUTH: 'Ошибка авторизации',
      ERR_FIELD_REQUIRED: 'Обязательное поле',
      ERR_INVALID_QUERY_PARAMS: 'Некорректные параметры запроса',
      ERR_NOT_VALID: 'Неверные данные',
      ERR_NO_FILES: 'Файлы не загружены',
      ERR_NOT_ALLOWED: 'Недостаточно прав',
      ERR_NOT_FOUND: 'Не найдено',
      ERR_VALIDATION_ERROR: 'Ошибка валидации',
      ERR_ACCOUNT_ALREADY_EXIST: 'Аккаунт уже существует',
      ERR_INVALID_PASSWORD: 'Некорректный пароль',
      ERR_INCORRECT_PASSWORD: 'Неверный пароль',
      ERR_INCORRECT_EMAIL_OR_PASSWORD: 'Неверный email или пароль'
    }
  }}
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: (savedLng as any) || 'ru',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  })

export default i18n
